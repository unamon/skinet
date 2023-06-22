using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager) { 
            if (!userManager.Users.Any()) { 
                var user = new AppUser{
                    DisplayName = "Bob"
                    , Email = "bob@test.com"
                    , UserName = "bot@test.com"
                    , Adress = new Address { 
                        FirstName = "Bob"
                        , LastName = "Bobbert"
                        , Street = "10 strt"
                        , City = "newyork"
                        , State = "NY"
                        , ZipCode = "90210"
                    }
                };
            await userManager.CreateAsync(user, "Pa$$w0rd");
            };

        }
    }
}