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
                        <StackLayout :class="{ 'item-selected': selected === result.id }">
                            <Label :text="result.name"></Label>
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
                console.log('is selected', this.isSelected)
                console.log('is invite', this.isInvite)
            },

            onSubmit() {
                if (! this.isInvite) {
                    this.$modal.close(
                        this.results.find(i => i.id === this.selected)
                    )
                } else {
                    // TODO: add dialog to get first and last name
                    // also make it not look like shit
                }
            }
        }
    }
</script>

<style scoped>
    .item-selected {
        background-color: #B02F26;
    }

    .item-selected Label {
        color: #ffe6e6;
    }
</style>