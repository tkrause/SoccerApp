<template>
    <Page class="page" actionBarHidden="true">
        <StackLayout horizontalAlignment="center" verticalAlignment="center">
            <StackLayout orientation="horizontal">
                <Label class="h2 fa text-light m-r-8" :text="'fa-chain-broken' | fonticon" verticalAlignment="center"></Label>
                <Label class="h2 text-light">No Internet Connection</Label>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .page {
        background-color: #D34C46;
    }

    .text-light {
        color: #ffd6d8;
    }

</style>