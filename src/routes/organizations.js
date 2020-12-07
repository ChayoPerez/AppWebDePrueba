const KoaRouter = require('koa-router');
//const { where } = require("sequelize");
const router = new KoaRouter();

const PERMITTED_FIELDS = [
    "name",
    "url",
  ];


router.param("id", async (id, ctx, next) => {
    // usamos ctx.state para enviar algo a otro middleware
    // ctx.orm.user significa el modelo dentro de sequelize
    const organization = await ctx.orm.organization.findByPk(id);
    if (!organization) ctx.throw(404); // si no existe retorna not found
    ctx.state.organization = organization;
    return next();
  });
  
router.get("organizations", "/", async (ctx) => {

    //const { cloudinary } = ctx.state;
    //const organization = ctx.state.currentOrganization;
    const organizations = await ctx.orm.organization.findAll();
    /* organizations.forEach(org => {
      org.dataValues.cloudinaryImage = cloudinary.url(org.image);
    }); */

    await ctx.render("organizations/index", {
      organizations,
      //getOrganizationPath: ctx.router.url("organization", { id: recipe.user.id }),
    });
  });
  
  router.get("organizations-new", "/new", async (ctx) => {
    const organization = ctx.orm.organization.build();
    return ctx.render("organizations/new", {
      organization,
      createOrgPath: ctx.router.url("organizations-create"),
    });
  });
  
 
  router.post("organizations-create", "/", async (ctx) => {
    const organization = ctx.orm.organization.build(ctx.request.body);
    try {
      await organization.save({ fields: PERMITTED_FIELDS });
      ctx.redirect(ctx.router.url("organizations"));
    } catch (error) {
      //  Si hay un error vuelve a new
      await ctx.render("organizations/new", {
        createOrgPath: ctx.router.url("organizations-create"),
        errors: error.errors,
      });
    }
  });

  router.get("organization-show", "/:id", async (ctx) => {
    const orgId = ctx.params.id
    const organization = await ctx.orm.organization.findByPk(orgId);
    return ctx.render("organizations/show", {
      organization,
    });
  });

module.exports = router;