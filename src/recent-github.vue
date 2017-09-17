<recent-github inline-component>
    Recent GitHub component<br>
    <b>Username:</b> {{username}}<br>
    <b>Options:</b> {{JSON.stringify(options)}}<br>
    <b>Limit:</b> {{limit}}
</recent-github>

<script>
    import Vue from "vue";

    Vue.component("recent-github", {
        name: "recent-github",
        props: {
            username: String,
            options: {
                type: Object,
                default: () => {
                    return { sort: "pushed" }
                }
            },
            limit: {
                type: Number,
                default: 7
            }
        }
    });
</script>