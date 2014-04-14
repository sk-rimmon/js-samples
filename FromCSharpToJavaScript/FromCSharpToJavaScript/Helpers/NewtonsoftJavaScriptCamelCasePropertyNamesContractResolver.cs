// -----------------------------------------------------------------------
//  <copyright file="NewtonsoftJavaScriptCamelCasePropertyNamesContractResolver.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript
{
    using Newtonsoft.Json.Serialization;

    internal class NewtonsoftJavaScriptCamelCasePropertyNamesContractResolver : CamelCasePropertyNamesContractResolver
    {
        #region Internal Methods

        internal string Resolve(string propertyName)
        {
            return this.ResolvePropertyName(propertyName);
        }

        #endregion
    }
}