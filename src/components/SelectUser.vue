<template>
    <Frame>
        <Page class="page">
            <ActionBar class="action-bar" title="Select a User">
                <NavigationButton @tap="onBack" icon="res://back"/>
            </ActionBar>

            <StackLayout class="form">
                <TextField hint="Email"
                           class="input input-rounded input-border"
                           keyboardType="email"
                           autocorrect="false"
                           @textChange="onEmailChanged"
                           v-model="email"/>

                <ListView for="result in results"
                          class="list-group body"
                          separatorColor="transparent"
                          @itemTap="onSelectUser">
                    <v-template>
                        <StackLayout :class="{ 'item': true, 'item-selected': selected === result.id }">
                            <Label class="font-weight-bold" :text="result.name"></Label>
                            <Label :text="result.email"></Label>
                        </StackLayout>
                    </v-template>
                </ListView>

                <Button :isEnabled="isInvite ? canInvite : isSelected"
                        :text="submitText"
                        @tap="onSubmit" class="btn btn-primary btn-rounded-lg m-t-20"></Button>

            </StackLayout>

        </Page>
    </Frame>
</template>

<script>
    import { debounce } from "../services/util";

    export default {
        data() {
            return {
                email: null,
                user: null,
                results: [],
                selected: null,
            }
        },
        computed: {
            canInvite() {
                let regex = /\S+@\S+\.\S+/
                return this.selected === 'invite' && regex.test(this.email)
            },
            isInvite() {
                return this.selected === 'invite'
            },
            submitText() {
                if (! this.isInvite)
                    return 'Select'

                return this.canInvite ? 'Invite' : 'Invalid email'
            },
            isSelected() {
                return !! this.selected
            }
        },
        methods: {
            onBack() {
                this.$modal.close()
            },

            // debounce just delays the function call
            // so if they're typing we don't spam the API
            onEmailChanged: debounce(async function(e) {
                this.selected = null

                let { data: results } = await this.$api.userSearch(e.value)
                results.push({
                    id: 'invite',
                    name: 'Invite',
                    email: this.email,
                })

                this.results = results
            }, 400),

            onSelectUser(event) {
                this.selected = event.item.id

                let index = this.results.findIndex(i => i.id === event.item.id)
                let result = this.results[index]
                result.selected = ! result.selected

                this.$set(this.results, index, result)
            },

            async onSubmit() {
                if (! this.isInvite) {
                    await this.$modal.close(
                        this.results.find(i => i.id === this.selected)
                    )
                } else {
                    let result = await prompt("Enter the user's name")

                    if (result.result === true) {
                        let name = result.text

                        try {
                            let { data: user } = await this.$api.invite({
                                email: this.email,
                                name,
                            })
                            await this.$modal.close(user)
                        } catch (e) {
                            alert(e.message)
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .item-selected {
        background-color: #F2F3F4;
        border-radius: 8;
    }

    .item {
        padding: 6;
    }

    .item-selected Label {
        color: #283237;
    }
</style>