
# Blog

A simple blogging web application built on .NET Core


# Installation
### Prerequisites
- SQL Server
- .NET 7
- Node 18
- Visual Studio 2019
### Steps to run

 Download or clone the project.
 
 For running Angular project on Development Server

 * Open cmd in the UI/blog folder and run the following commands to install dependencies:
 ``` 
    npm install

    ng serve
 ```
 Then  navigate to http://localhost:4200 

For dot net project

* Open the solution in visual studion and then install the following
packages from Nuget packages

```
Microsoft.AspNetCore.Identity.EntityFrameworkCore Version = 7.0.8

Microsoft.EntityFrameworkCore.SqlServer Version = 7.0.8

Microsoft.EntityFrameworkCore.Tools Version = 7.0.8

Microsoft.AspNetCore.Authentication.JwtBearer  version = 7.0.8

Microsoft.IdentityModel.Tokens version = 7.0.3

System.IdentityModel.Tokens.Jwt version = 7.0.3
```

Then start the project.





