<template>
    <v-app>
        <v-navigation-drawer app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        测试平台
                    </v-list-item-title>
                    <v-list-item-subtitle> 爽爽 </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    @click="switchTab(item)"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <div>bar</div>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
        <v-footer app>
            <div>footer</div>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            items: [
                { title: '测试用例', icon: 'mdi-view-dashboard', router: 'Testcase' },
                { title: '测试任务', icon: 'mdi-image', router: 'Task' },
            ],
            right: null,
        }
    },
    methods: {
        switchTab(item) {
            this.$router.push({ name: item.router })
        },
    }
}
</script>