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
            bundles.Add(new ScriptBundle("~/js/jquery").Include("~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/js/bootstrap").Include("~/Scripts/bootstrap.js", "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/themes/default").Include("~/Themes/default/reset.css", "~/Themes/default/bootstrap.css", "~/Themes/default/bootstrap-theme.css",
                "~/Themes/default/pages.css"));
        }

        #endregion
    }
}