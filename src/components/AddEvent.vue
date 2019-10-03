<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Add Event">
            <NavigationButton @tap="onBack" icon="res://back"/>
        </ActionBar>

        <StackLayout class="form">

            <!--         You can delete this line and the label below it :)-->

            <TextField hint="Select a Team"
                       editable="false"
                       :text="form.other_team.name"
                       @tap="onSelectTeam"
                       class="input input-rounded input-border"></TextField>

            <DateTimePicker v-model="form.start_at" title="Date"></DateTimePicker>

            <TextField v-model="textFieldValue" hint="Enter Location"></TextField>

            <TextField v-model="textFieldValue" hint="Enter Address"></TextField>
            <Button text="Create" @tap="onButtonTap"></Button>

        </StackLayout>

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
            }
        },
        data() {
            return {
                textFieldValue: "",
                form: {
                    start_at: null,
                    event_type: null,
                    other_team: {}

                },

            }
        },
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
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