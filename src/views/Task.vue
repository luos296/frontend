<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="10"
        class="elevation-1"
    >
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn small color="primary" @click="viewReport(item)">查看</v-btn>
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
                { text: '任务描述', value: 'remark' },
                { text: '操作', value: 'actions' },
            ],
            desserts: [],
        }
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.$api.task.get().then(res => {
                console.log(res.data['data'])
                this.desserts = res.data['data']
            })
        },

        viewReport(item) {
            window.location.href = item.report
        },
    }
}
</script>