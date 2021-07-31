<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="10"
        class="elevation-1"
    >
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn small color="primary">查看</v-btn>
            <v-btn small color="error" text @click="deleteItem(item)">删除</v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {
                    text: '任务ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: '任务描述', value: 'describe' },
                { text: '操作', value: 'actions' },
            ],
            desserts: [
                {
                    id: 1,
                    describe: 159,
                },
                {
                    id: 2,
                    describe: 237,
                },
            ],
        }
    },
}
</script>