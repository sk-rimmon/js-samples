// -----------------------------------------------------------------------
//  <copyright file="CustomerModel.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CustomerModel
    {
        #region Public Properties

        [Display(Name = "City")]
        public string City { get; set; }

        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "First name")]
        public string FirstName { get; set; }

        public long Id { get; set; }

        [Display(Name = "Last name")]
        public string LastName { get; set; }

        [Display(Name = "Number of orders")]
        public int NumberOfOrders { get; set; }

        #endregion
    }
}