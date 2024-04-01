using Blog.Models.Models.Domain;
using Blog.Models.Models.DTO;

namespace Blog.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> CreateAsync(BlogPost blogPost);
        Task<PagedResult<BlogPost>> GetAllAsync(BlogFilterAndPagination parms);
        Task<BlogPost?> GetByIdAsync(Guid id);
        Task<BlogPost?> DeleteAsync(Guid id);
        Task<BlogPost?> UpdateAsync(BlogPost blogPost);
        Task<BlogPost?> GetByUrlHandleAsync(string urlHandle);
    }
}
