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
            bundles.Add(new ScriptBundle("~/js/learning").Include("~/Scripts/learning/console.js", "~/Scripts/learning/console-init.js", "~/Scripts/learning/basics.js",
                "~/Scripts/learning/donts.js"));

            // tests samples
            bundles.Add(new ScriptBundle("~/js/qunit").Include("~/Scripts/components/calculator.js", "~/Scripts/qunit-sample/qunit-1.14.0.js",
                "~/Scripts/qunit-sample/calculator.tests.js"));
            bundles.Add(new ScriptBundle("~/js/jasmine").Include("~/Scripts/components/calculator.js", "~/Scripts/jasmine-sample/jasmine.js",
                "~/Scripts/jasmine-sample/jasmine-html.js", "~/Scripts/jasmine-sample/boot.js", "~/Scripts/jasmine-sample/calculator.tests.js"));

            // themes
            bundles.Add(new StyleBundle("~/themes/default").Include("~/Themes/default/reset.css", "~/Themes/default/bootstrap.css", "~/Themes/default/bootstrap-theme.css",
                "~/Themes/default/pages.css"));

            bundles.Add(new StyleBundle("~/themes/default/qunit").Include("~/Themes/default/qunit/qunit-1.14.0.css").Include("~/Themes/default/qunit/qunit-theme-ninja.css"));

            bundles.Add(new StyleBundle("~/themes/default/jasmine").Include("~/Themes/default/jasmine/jasmine.css"));
        }

        #endregion
    }
}