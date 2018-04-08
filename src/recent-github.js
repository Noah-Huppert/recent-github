import {Element as PolymerElement} from "../node_modules/@polymer/polymer/polymer-element.js";
import {Client as Client} from "./client.js";

export class RecentGitHub extends PolymerElement {
    static get template() {
        return `<div>Recent GitHub element<br>\
                    <b>Username:</b>[[username]]<br>\
                    <b>Options:</b>[[stringify(options)]]<br>\
                    <b>Limit:</b>[[limit]]\
                </div>`;
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        this.client = new Client(this.username, this.options);
        this.client.getRecentRepos(this.limit).then((res) => {
            console.log(`later the res was: ${res}`);
        }).catch((err) => {
            console.error(`later there was an error`, err);
        });
    }

    stringify(o) {
        return JSON.stringify(o);
    }

    static get properties() {
        return {
            username: String,
            options: {
                type: Object,
                value: () => {
                    return { sort: "pushed" };
                }
            },
            limit: {
                type: Number,
                value: 7
            }
        };
    }
}

customElements.define("recent-github", RecentGitHub);