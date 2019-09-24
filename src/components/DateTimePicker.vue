<template>
    <TextField :text="date | calendarDate"
               class="input input-border input-rounded"
               @tap="onSelect"
               :editable="false"
               :hint="title" />
</template>

<script>
    import moment from 'moment'
    const ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker
    const picker = new ModalPicker()

    export default {
        props: {
            title: {
                type: String,
                default: '',
            },
            style: { }
        },
        data() {
            return {
                date: null,
            }
        },
        filters: {
            calendarDate(v) {
                if (v instanceof Date)
                    return moment(v).calendar(null, {
                        sameElse: 'MMMM D, YYYY [at] h:mm A'
                    })

                return null
            }
        },
        methods: {
            async onSelect() {
                try {
                    let day = await picker.pickDate({
                        theme: 'dark',
                        minDate: new Date(),
                        startingDate: this.date ?? new Date()
                    })

                    let time = await picker.pickTime({
                        startingHour: this.date?.getHours() ?? 8,
                        startingMinute: this.date?.getMinutes() ?? 0,
                    })

                    this.date = new Date(
                        day.year,
                        day.month - 1, // yes trust me this is ok
                        day.day,
                        time.hour,
                        time.minute
                    );
                } catch (err) { }
            }
        }
    }
</script>