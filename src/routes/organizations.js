const KoaRouter = require('koa-router');
//const { where } = require("sequelize");
const router = new KoaRouter();

const PERMITTED_FIELDS = [
    "name",
    "url",
  ];


router.param("id", async (id, ctx, next) => {
    // usamos ctx.state para enviar algo a otro middleware
    // ctx.orm.user significa el modelo user dentro de sequelize
    const organization = await ctx.orm.organization.findByPk(id);
    if (!organization) ctx.throw(404); // si no existe retorna not found
    ctx.state.organization = organization;
    return next();
  });
  
  router.get("organizations", "/", async (ctx) => {

    //const { cloudinary } = ctx.state;
    //const organization = ctx.state.currentOrganization;
    const organizations = await ctx.orm.organization.findAll({ include: "organization" });
    /* organizations.forEach(org => {
      org.dataValues.cloudinaryImage = cloudinary.url(org.image);
    }); */

    await ctx.render("organizations/index", {
      organizations,
    });
  });
  
  router.get("organizations-new", "/new", async (ctx) => {
    const organization = ctx.orm.organization.build();
    return ctx.render("organizations/new", {
      organization,
    });
  });
  
 
  router.post("organizations-create", "/", async (ctx) => {
    const organization = ctx.orm.organization.build(ctx.request.body);
    /* const { cloudinary } = ctx.state;
    const { image } = ctx.request.files;
    let recipeImageId;
    if (image.size > 0) {
      const uploadedImage = await cloudinary.uploader.upload(image.path);
      recipeImageId = uploadedImage.public_id;
    }
    recipe.image = recipeImageId; */
    try {
      await organization.save({ fields: PERMITTED_FIELDS });
      ctx.redirect(ctx.router.url("organization", { id: organization.id }));
    } catch (error) {
      await ctx.render("organizations/new", {
        errors: error.errors,
      });
    }
  });

  router.get("organization", "/:id", async (ctx) => {
    // await ctx.orm.like.destroy({where: {}}).then(function () {});
    const organization = await ctx.orm.organization.findByPk(id);
    return ctx.render("organizations/show", {
      organization,
    });
  });