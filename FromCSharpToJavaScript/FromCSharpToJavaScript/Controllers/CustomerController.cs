// -----------------------------------------------------------------------
//  <copyright file="CustomerController.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using FromCSharpToJavaScript.Models;

    public class CustomerController : MvcApplicationController
    {
        #region Fields

        private readonly IEnumerable<CustomerModel> _data = new List<CustomerModel>
        {
            new CustomerModel
            {
                Id = 1,
                FirstName = "Test",
                LastName = "Customer",
                City = "Test City",
                Email = "test.customer@crm.com",
                NumberOfOrders = 1
            }
        };

        #endregion

        #region Public Methods

        [HttpGet]
        [Route("customers/")]
        public ActionResult Customers()
        {
            return this.PartialView("_Index");
        }

        [HttpPost]
        [Route("customers/")]
        public ActionResult Customers(int page, int size, string filter, IEnumerable<SortItem> sort)
        {
            var result = new
            {
                total = 1,
                page = page,
                rows = this._data
            };

            return this.Json(result);
        }

        [HttpGet]
        [Route("customer/detail/")]
        public ActionResult Detail()
        {
            return this.PartialView("_Detail");
        }

        [HttpGet]
        [Route("customer/detail/{customerId:long}")]
        public ActionResult Detail(long customerId)
        {
            var customer = this._data.FirstOrDefault(c => c.Id == customerId);

            var result = new
            {
                data = customer,
                success = customer != null
            };

            return this.Json(result);
        }

        [HttpGet]
        [Route("customer/new")]
        public ActionResult New()
        {
            return this.PartialView("_New");
        }

        #endregion
    }
}