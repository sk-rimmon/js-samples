// -----------------------------------------------------------------------
//  <copyright file="LearningController.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript.Controllers
{
    using System.Web.Mvc;

    public class LearningController : MvcApplicationController
    {
        #region Public Methods

        [HttpGet]
        public ActionResult Index()
        {
            return this.View();
        }

        #endregion
    }
}