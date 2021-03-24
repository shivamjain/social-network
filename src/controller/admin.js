const _ = require("lodash");
const Auth = require("./auth");
const Validation = require("../validations");
const Util = require("../misc/util");

class Admin extends Auth {
    constructor(req, res) {
        super(req, res);

        this.beforeMethods = {
            "dashboard": ["_secure"],
            "post": ["_secure"]
        };
    }

    async dashboard() {
        let title = "Welcome to Dashboard", errorMsg = "", successMsg = "";

        this.res.render("admin/dashboard", {
            layout: "admin",
            title,
            error: errorMsg,
            success: successMsg,
            user: this.user ? this.user.toJSON() : null
        });
    }

    async post() {
        let title = "Create Post", errorMsg = "", successMsg = "";
        if (this.req.method == "POST") {
            // Handle form submission
            let { error, value } = Validation.Admin.PostSchema.validate(this.req.body);
            if (error) {
                console.log(error);
                errorMsg = _.size(error.details) > 0 ? error.details[0].message : null;
            } else {
                try {
                    //console.log(this.user);
                    // set and save post
                    let post = new this.models.Post({
                        _id: Util.generateMongoId(),
                        title: value.title,
                        description: value.description,
                        userId: this.user._id
                    });
                    await post.save();
                    //console.log(post);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        this.res.render("admin/post", {
            layout: "admin",
            title,
            error: errorMsg,
            success: successMsg,
            user: this.user ? this.user.toJSON() : null
        });
    }
    
}

module.exports = Admin;