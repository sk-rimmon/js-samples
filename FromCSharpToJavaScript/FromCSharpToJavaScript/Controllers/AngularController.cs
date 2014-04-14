// -----------------------------------------------------------------------
//  <copyright file="AngularController.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript.Controllers
{
    using System.Web.Mvc;

    [RoutePrefix("angular")]
    public class AngularController : MvcApplicationController
    {
        #region Public Methods

        [HttpGet]
        [Route("")]
        public ActionResult Index()
        {
            return this.View();
        }

        #endregion
    }
}