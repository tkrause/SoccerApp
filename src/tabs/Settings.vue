<template>
    <Frame>
        <Page class="page" actionBarHidden="true">

            <ListView
                    for="option in options"
                    class="list-group"
                    separatorColor="transparent"
                    @itemTap="onItemTap">

                <v-template>
                    <GridLayout class="p-y-8" columns="45, *" orientation="horizontal">
                        <Label horizontalAlignment="center" class="fa item-icon" :text="option.icon | fonticon"></Label>
                        <StackLayout col="1" verticalAlignment="center">
                            <Label class="item-title" :text="option.title"></Label>
                            <Label v-if="option.detail"
                                   class="text-muted"
                                   :text="option.detail"
                            ></Label>
                        </StackLayout>
                    </GridLayout>
                </v-template>
            </ListView>

        </Page>
    </Frame>
</template>

<script>
    import Login from "../components/Login";
    import * as appSettings from "tns-core-modules/application-settings";

    export default {
        props: {
            team: {
                type: Object,
                required: true,
            }
        },

        data() {
            let record = `Record: ${this.team.wins} - ${this.team.losses}`

            return {
                options: [
                    { title: this.team.name, detail: record, icon: 'fa-futbol-o' },
                    { title: `Viewing as ${this.$api.current_user.name}`, icon: 'fa-user' },
                    { title: 'Logout', icon: 'fa-sign-out', handler: this.onLogout }
                ]
            }
        },

        methods: {
            onGoBack() {
                this.$navigateBack()
            },

            onItemTap({ item }) {
                if (item.handler && typeof item.handler === 'function') {
                    item.handler()
                }
            },

            onLogout() {
                appSettings.clear()
                this.$api.logout()
                this.$navigateTo(Login, {
                    clearHistory: true,
                })
            }
        }
    }
</script>

<style scoped>
    .item-icon {
        color: #D34C46;
        font-size: 28;
        vertical-align: center;
    }

    .item-title {
        font-size: 16;
        vertical-align: center;
    }

    .list-group {
        margin: 12;
    }

</style>