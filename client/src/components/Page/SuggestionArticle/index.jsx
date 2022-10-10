import React, { useEffect, useState } from 'react';
import postsApi from '../../../axiosClient/api/posts';
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
export default function SuggestionArticle({ author, _id, tags }) {
  const [relatedArticle, setRelatedArticle] = useState();
  const [authorArticle, setAuthorArticle] = useState();
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  console.log(_id);
  console.log(tags);
  useEffect(() => {
    (async () => {
      if (author) {
        try {
          const res = await postsApi.getPostByAuthor(author);

          const x = res.data.posts.filter((item) => item._id !== _id);
          setAuthorArticle(x);
          setUser(res.data.user);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [author, _id]);
  return (
    <div className="py-12">
      <div className="">
        <b>Bai viet lien quan</b>
      </div>
      <div>
        <b>Bai viet khac cua {user || 'User'}</b>
        {authorArticle && authorArticle.length > 0 && (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={1000}
            containerClass="carousel-container p-4 py-6"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass="custom-dot-list-style text-blue-300"
            arrows={false}
            partialVisbile
          >
            {authorArticle.map((item) => (
              <div
              onClick={()=>{
                navigate(`/post/${item._id}`)
              }}
                key={item._id}
                className="w-[270px] h-[150px] bg-white px-2 rounded-lg cursor-pointer"
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
              >
                <p className="text-xl line-clamp-2">
                    {item.title}
                </p>
                <p className="text-lime-500 text-sm">
                    {user}
                </p>
                
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}