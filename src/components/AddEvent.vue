<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add Event">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">
            <TextField hint="Select type of Event"
                       editable="false"
                       :text="form.event_type"
                       @tap="onSelectEventType"
                       class="input input-rounded input-border"></TextField>
            <!--         You can delete this line and the label below it :)-->
            <!--
            <TextField hint="Select a Team"
                       editable="false"
                       :text=""
                       @tap="onSelectTeam"
                       class="input input-rounded input-border"></TextField>
            -->


            <Label :text="form.start_at"></Label>
            <DateTimePicker v-model="form.start_at" title="Date"></DateTimePicker>

            <TextField v-model="textFieldValue" hint="Enter Location"></TextField>

            <TextField v-model="textFieldValue" hint="Enter Address"></TextField>
            <Button text="Create" @tap="onButtonTap"></Button>

        </StackLayout>

    </Page>
</template>

<script>
    import DateTimePicker from "./DateTimePicker";

    export default {
        components: {
            DateTimePicker
        },
        props: {
            team: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                textFieldValue: "",
                textFieldValue: "",
                textFieldValue: "",
                textFieldValue: "",
                textFieldValue: "",
                form: {
                    start_at: null,
                    event_type: null
                },
                types: [
                    'Game',
                    'Event',

                ],
            }
        },
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
            },
            onBack() {
                this.$navigateBack();
            },
            /*
            async onSelectTeam() {
                this.form.user = await this.$showModal(SelectUser, {
                    transition: 'slideTop',
                    fullscreen: true,
                }),
              */

            async onSelectEventType() {
                try {
                    let result = await action("Select a Event Type", "Cancel", this.types)
                    this.form.event_type = result
                } catch (e) {
                }
            }
        }
    }
</script>

<style>
    .form {
        margin: 20;
    }

</style>