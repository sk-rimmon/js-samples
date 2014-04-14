// -----------------------------------------------------------------------
//  <copyright file="Routes.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public sealed class Routes
    {
        #region Public Methods

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();
        }

        #endregion
    }
}