<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add Event">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <ScrollView>
            <StackLayout class="form">

                <!--         You can delete this line and the label below it :)-->

                <TextField  v-if="isGame"
                            hint="Select a Team"
                           editable="false"
                           :text="form.other_team.name"
                           @tap="onSelectTeam"
                           class="input input-rounded input-border"></TextField>

                <DateTimePicker v-model="form.start_at" title="Date"></DateTimePicker>

                <TextField v-model="form.location"
                           hint="Enter Location"
                           class="input input-rounded input-border"></TextField>

                <TextField v-model="form.address"
                           hint="Enter Address"
                           class="input input-rounded input-border"></TextField>

                <TextView  v-model="form.detail"
                           hint="Comments"
                           class="input input-rounded input-border">

                </TextView>

                <Button text="Create" @tap="onCreateEvent" class="btn btn-primary btn-rounded-lg m-t-20"></Button>

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import DateTimePicker from "./DateTimePicker";
    import SelectTeam from "./SelectTeam";

    export default {
        components: {
            DateTimePicker
        },
        props: {
            team: {
                type: Object,
                required: true,
            },
            eventType: {
                type: String,
                required: true,
            }
        },
        data() {
            return {
                form: {
                    start_at: null,
                    other_team: {},
                    location: null,
                    address: null,
                    detail: null,
                },

            }
        },
        computed: {
            isGame() {
                return this.eventType === 'game'
            }
        },
        methods: {
            async onCreateEvent() {
                try {
                    let data = {
                        event_type: this.eventType,
                        location_name: this.form.location,
                        location_address: this.form.address,
                        location_detail: this.form.detail,
                        start_at: this.form.start_at,
                        home_team_id: this.team.id,
                    }

                    if (this.isGame) {
                        data.away_team_id = this.form.other_team.id
                    }

                    await this.$api.client.post('/events', data)

                    this.onBack()
                } catch (e) {
                    alert(e.response.data.error || e.message)
                }

                // For William :)
                // let response = await this.$api.client.post('/events/5', {
                //     home_score: 9999,
                //     away_score: 5,
                // })


                /*
                {
                  "event_type": "event",
                  "home_score": null,
                  "away_score": null,
                  "location_name": "Blue Plate Eatery",
                  "location_address": "11408 Darlena Trace, West Berry, MD 55271-5104",
                  "location_detail": "Odio dolorum sed porro.",
                  "start_at": "2019-11-05T15:17:49.000-08:00",
                  "home_team_id": 1
                }
                 */
            },
            onBack() {
                this.$navigateBack();
            },

            async onSelectTeam() {
                this.form.other_team = await this.$showModal(SelectTeam, {
                    transition: 'slideTop',
                    fullscreen: true,

                })
            }
        }
    }
</script>

<style>
    .form {
        margin: 20;
    }

</style>