using Blog.API.Data;
using Blog.API.Repositories.Interface;
using Blog.Models.Models.Domain;
using Blog.Models.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace Blog.API.Repositories.Implementation
{
    public class BlogPostRepository: IBlogPostRepository
    {
        private readonly ApplicationDbContext dbContext;

        public BlogPostRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await dbContext.BlogPosts.AddAsync(blogPost);
            await dbContext.SaveChangesAsync();
            return blogPost;
        }

        public async Task<PagedResult<BlogPost>> GetAllAsync(BlogFilterAndPagination parms)
        {
            var blogQuery =   dbContext.BlogPosts.Include(x => x.Categories).AsQueryable();

            if(!string.IsNullOrEmpty(parms.Title))
            {
                blogQuery = blogQuery.Where(x => x.Title.Contains(parms.Title));    
            }

            if (!string.IsNullOrEmpty(parms.Categories))
            {
                blogQuery = blogQuery.Where(x => x.Categories.Any(x => x.Name.ToUpper() == parms.Categories.ToUpper()));
            }
            if (!string.IsNullOrEmpty(parms.Visibility) && parms.Visibility.ToUpper() != "ALL")
            {
                if(parms.Visibility.ToUpper() == "VISIBLE")
                {
                    blogQuery = blogQuery.Where(x => x.IsVisible);

                }
                if (parms.Visibility.ToUpper() == "NOT_VISIBLE")
                {
                    blogQuery = blogQuery.Where(x => !x.IsVisible);

                }
            }
            var numberOfBlogs = await blogQuery.CountAsync();

            var posts =  await blogQuery.Skip((parms.PageNumber - 1) * parms.PageSize)
                .Take(parms.PageSize).ToListAsync();

            var result = new PagedResult<BlogPost>();

            result.Data = posts;
            result.TotalCount =numberOfBlogs;
            result.NoOfPages =(int) Math.Ceiling((decimal)numberOfBlogs /(decimal) parms.PageSize);
            result.IsPrevAvailable = parms.PageNumber != 1;
            result.IsNextAvailable = parms.PageSize * parms.PageNumber < numberOfBlogs;

            return result;
        }

        

        public async Task<BlogPost?> GetByIdAsync(Guid id)
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<BlogPost?> UpdateAsync(BlogPost blogPost)
        {
            var existingBlogPost = await dbContext.BlogPosts.Include(x => x.Categories)
                .FirstOrDefaultAsync(x => x.Id == blogPost.Id);

            if (existingBlogPost == null)
            {
                return null;
            }

            // Update BlogPost
            dbContext.Entry(existingBlogPost).CurrentValues.SetValues(blogPost);

            // Update Categories
            existingBlogPost.Categories = blogPost.Categories;

            await dbContext.SaveChangesAsync();

            return blogPost;
        }
        public async Task<BlogPost?> DeleteAsync(Guid id)
        {
            var existingBlogPost = await dbContext.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);

            if (existingBlogPost != null)
            {
                dbContext.BlogPosts.Remove(existingBlogPost);
                await dbContext.SaveChangesAsync();
                return existingBlogPost;
            }

            return null;
        }


        public async Task<BlogPost?> GetByUrlHandleAsync(string urlHandle)
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.UrlHandle == urlHandle);
        }
    }
}
