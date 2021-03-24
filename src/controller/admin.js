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

        //Retrieve posts
        let postData = await this.posts_fetch();
        //console.log(postData);

        this.res.render("admin/dashboard", {
            layout: "admin",
            title,
            error: errorMsg,
            success: successMsg,
            user: this.user ? this.user.toJSON() : null,
            post: postData ? postData : null
        });
    }

    // Create post
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
                    successMsg = "Post created successfully!";
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

    async posts_fetch() {
        try {
            //*use lean() OR add runtime option to handlebars engine to resolve access "own property" issue*
            if(!this.user){
                throw new Error("User not found");
            }
            let post = await this.models.Post.find({ userId: this.user._id }).lean();
            // _.each(post, (p) => {
            //     p = p.toJSON();
            // });
            return post;
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Admin;