<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer expand-on-hover rail color="#47667B">
                <v-list>
                    <v-list-item prepend-avatar="W" title="Wisegress"></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list nav>
                    <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
                    <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-layout>
    </v-card>
</template>
  
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import * as md from '@mdi/js';
export default {
    name: 'SideBar',
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        md() {
            return md;
        },
    },
}
</script>