// -----------------------------------------------------------------------
//  <copyright file="Bundles.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript
{
    using System.Web.Optimization;

    public sealed class Bundles
    {
        #region Public Methods

        public static void RegisterBundles(BundleCollection bundles)
        {
            // common
            bundles.Add(new ScriptBundle("~/js/jquery").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/js/bootstrap").Include("~/Scripts/bootstrap.js", "~/Scripts/respond.js"));

            // learning
            bundles.Add(new ScriptBundle("~/js/learning").Include("~/Scripts/learning/console.js", "~/Scripts/learning/console-init.js", "~/Scripts/learning/guide.basics.js",
                "~/Scripts/learning/guide.donts.js"));

            // tests samples
            bundles.Add(new ScriptBundle("~/js/qunit").Include("~/Scripts/components/calculator.js", "~/Scripts/qunit-1.14.0.js",
                "~/Scripts/components/calculator.tests.qunit.js"));
            bundles.Add(new ScriptBundle("~/js/jasmine").Include("~/Scripts/components/calculator.js", "~/Scripts/jasmine/jasmine.js",
                "~/Scripts/jasmine/jasmine-html.js", "~/Scripts/jasmine/boot.js", "~/Scripts/components/calculator.tests.jasmine.js"));

            // angular
            bundles.Add(new ScriptBundle("~/js/angular").Include("~/Scripts/angular/angular.js", "~/Scripts/angular/angular-cookies.js",
                "~/Scripts/angular/angular-loader.js", "~/Scripts/angular/angular-route.js", "~/Scripts/angular/angular-bootstrap.js"));
            
            // angular-app
            bundles.Add(new ScriptBundle("~/js/angular-app").Include("~/Scripts/angular-app/app.init.js", "~/Scripts/angular-app/app.ajax.js",
                "~/Scripts/angular-app/app.console.js", "~/Scripts/angular-app/app.csrf.js", "~/Scripts/angular-app/app.debug.js", "~/Scripts/angular-app/app.defaults.js",
                "~/Scripts/angular-app/app.dialogs.js", "~/Scripts/angular-app/app.forms.js", "~/Scripts/angular-app/app.grids.js", "~/Scripts/angular-app/app.mvc.js",
                "~/Scripts/angular-app/app.screen.js"));

            // angular-app assets
            bundles.Add(new ScriptBundle("~/js/angular-app/assets").Include("~/Scripts/angular-app/customers/config.js", "~/Scripts/angular-app/customers/controllers.js",
                "~/Scripts/angular-app/customers/services.js"));

            // themes
            bundles.Add(new StyleBundle("~/themes/default").Include("~/Themes/default/reset.css", "~/Themes/default/bootstrap.css", "~/Themes/default/pages.css"));

            bundles.Add(new StyleBundle("~/themes/default/qunit").Include("~/Themes/default/qunit/qunit-1.14.0.css").Include("~/Themes/default/qunit/qunit-theme-ninja.css"));

            bundles.Add(new StyleBundle("~/themes/default/jasmine").Include("~/Themes/default/jasmine/jasmine.css"));
        }

        #endregion
    }
}