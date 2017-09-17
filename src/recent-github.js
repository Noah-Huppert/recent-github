import Polymer from "@polymer/polymer";

/**
 * RecentGitHub is a Polymer element class. This element shows a list of recent projects a specified GitHub
 * user has contributed to
 */
class RecentGitHub extends Polymer.Element {
    static get is() {
        return "recent-github";
    }

    static get properties() {
        return {
            username: String,
            options: {
                type: Object,
                value: {
                    sort: "pushed"
                }
            },
            limit: {
                type: Number,
                value: 7
            }
        };
    }

    constructor() {
        super();
        console.log(`constructor: ${this.username}, ${this.options}, ${this.limit}`);
    }
}

customElements.define(RecentGitHub.is, RecentGitHub);