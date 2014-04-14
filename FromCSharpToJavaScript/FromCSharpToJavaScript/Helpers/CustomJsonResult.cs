// -----------------------------------------------------------------------
//  <copyright file="CustomJsonResult.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public class CustomJsonResult : JsonResult
    {
        #region Public Methods

        public override void ExecuteResult(ControllerContext context)
        {
            HttpResponseBase response = context.HttpContext.Response;

            if (!String.IsNullOrEmpty(this.ContentType))
            {
                response.ContentType = this.ContentType;
            }
            else
            {
                response.ContentType = "application/json";
            }

            if (this.ContentEncoding != null)
            {
                response.ContentEncoding = this.ContentEncoding;
            }

            if (this.Data != null)
            {
                response.Write(JsonConvert.SerializeObject(this.Data, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                }));
            }
        }

        #endregion
    }
}