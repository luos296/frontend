<template>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        item-key="id"
        sort-by="id"
        class="elevation-1"
        show-select
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>测试用例</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="green" dark class="mb-2" @click="excuteTask"
                    >执行任务</v-btn
                >
                <div style="width: 10px"></div>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            新建用例
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.id"
                                            label="用例ID"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.nodeid"
                                            label="nodeid"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.remark"
                                            label="备注"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5"
                            >Are you sure you want to delete this
                            item?</v-card-title
                        >
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="closeDelete"
                                >Cancel</v-btn
                            >
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="deleteItemConfirm"
                                >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
    </v-data-table>
</template>

<script>
export default {
    data: () => ({
        selected: [],
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: '用例ID',
                align: 'start',
                sortable: false,
                value: 'id',
            },
            { text: 'nodeid', value: 'nodeid' },
            { text: '备注', value: 'remark' },
            { text: '操作', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            id: 0,
            nodeid: '',
            remark: '',
        },
        defaultItem: {
            id: 0,
            nodeid: '',
            remark: '',
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? '新建用例' : '编辑用例'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.$api.testcase.get().then(res => {
                // console.log(res.data['data'])
                this.desserts = res.data['data']
            })
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
            // console.log(this.editedItem)
            this.$api.testcase.delete({id:this.editedItem['id']}).then(res =>{
                console.log(res.data)
            })

        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
                // console.log(this.editedItem)
                this.$api.testcase.put(this.editedItem).then(res =>{
                    console.log(res.data)
                })
            } else {
                this.desserts.push(this.editedItem)
                // console.log(this.editedItem)
                this.$api.testcase.post(this.editedItem).then(res =>{
                    console.log(res.data)
                })
            }
            this.close()
        },

        excuteTask() {
            console.log(this.selected)
            this.$api.task.post({'nodeids':this.selected}).then(res =>{
                    console.log(res.data)
                    if (res.data['error'] === 0){
                        alert('执行成功，请前往任务页面查看')
                    }
                    else{
                        alert('执行失败！！！')
                    }
            })
        }
    },
}
</script>