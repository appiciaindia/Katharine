const BlogCard = ({ blog }) => {
  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm">

      <div className="overflow-hidden">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span>{blog.category}</span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {blog.title}
        </h3>

        <p className="text-gray-600 text-sm leading-6 mb-4">
          {blog.para}
        </p>

        <a
          href={blog.link}
          className="inline-flex items-center font-medium text-orange-500 hover:text-blue-600"
        >
          Read More
          <span className="ml-2">→</span>
        </a>

      </div>
    </article>
  );
};

export default BlogCard;