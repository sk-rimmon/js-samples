// -----------------------------------------------------------------------
//  <copyright file="HtmlHelperExtensions.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System.Web.Mvc;

    public static class HtmlHelperExtensions
    {
        #region Public Methods

        public static string JsPropertyName<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper, string prefix, Expression<Func<TModel, TProperty>> expression)
        {
            var fieldName = htmlHelper.ViewData.TemplateInfo.GetFullHtmlFieldName(ExpressionHelper.GetExpressionText(expression));
            var propertyName = ResolvePropertyName(fieldName);

            if (String.IsNullOrWhiteSpace(prefix))
            {
                return propertyName;
            }

            return prefix + "." + propertyName;
        }

        #endregion

        #region Private Methods

        private static string ResolvePropertyName(string propertyName)
        {
            if (String.IsNullOrWhiteSpace(propertyName))
            {
                return propertyName;
            }

            var contractResolver = new NewtonsoftJavaScriptCamelCasePropertyNamesContractResolver();

            if (!propertyName.Contains("."))
            {
                return contractResolver.Resolve(propertyName);
            }

            var splits = propertyName.Split('.');
            var result = new List<string>(splits.Length);

            foreach (var split in splits)
            {
                result.Add(contractResolver.Resolve(split));
            }

            return String.Join(".", result);
        }

        #endregion
    }
}