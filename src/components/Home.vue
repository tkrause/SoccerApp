<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Soccer League"></ActionBar>
        <Label class="font-weight-bold">Welcome {{ $api.current_user.name }}</Label>
    </Page>
</template>

<script>
    export default {
        name: "Home",
    }
</script>