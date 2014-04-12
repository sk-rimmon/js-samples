// -----------------------------------------------------------------------
//  <copyright file="TestExamplesController.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript.Controllers
{
    using System.Web.Mvc;

    [RoutePrefix("test-samples")]
    public class TestExamplesController : MvcApplicationController
    {
        #region Public Methods

        [HttpGet]
        [Route("jasmine")]
        public ActionResult Jasmine()
        {
            return this.View();
        }

        [HttpGet]
        [Route("qunit")]
        public ActionResult QUnit()
        {
            return this.View();
        }

        #endregion
    }
}