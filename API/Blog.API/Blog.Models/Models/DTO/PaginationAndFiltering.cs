namespace Blog.Models.Models.DTO
{
    public class CPagination
    {
        const int maxPageSize = 10;
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }

    public class BlogFilterAndPagination: CPagination
    {
        public string? Title { get; set; }
        public string? Categories { get; set; }
        public string? Visibility { get; set; }
    }





}
