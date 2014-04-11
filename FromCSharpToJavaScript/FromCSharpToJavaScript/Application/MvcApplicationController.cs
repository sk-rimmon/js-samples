// -----------------------------------------------------------------------
//  <copyright file="MvcApplicationController.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript
{
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.Disabled)]
    public abstract class MvcApplicationController : Controller
    {
    }
}