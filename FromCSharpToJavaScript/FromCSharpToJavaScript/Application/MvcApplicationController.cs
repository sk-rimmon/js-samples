// -----------------------------------------------------------------------
//  <copyright file="MvcApplicationController.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript
{
    using System.Text;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.Disabled)]
    public abstract class MvcApplicationController : Controller
    {
        #region Protected Methods

        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new CustomJsonResult
            {
                ContentEncoding = contentEncoding,
                ContentType = contentType,
                Data = data,
                JsonRequestBehavior = behavior
            };
        }

        #endregion
    }
}