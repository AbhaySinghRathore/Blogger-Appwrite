import React from 'react'
import dbStorageService from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4" style={{height: "160px"}}>
                <div className="w-full justify-center mb-4">
                    <img src={dbStorageService.getFilePreview(featuredImage)}
                        alt={title} className="rounded-xl w-full" style={{height: "130px"}} />
                </div>
            </div>
            <h2 className='text-xl font-bold'>
                {title}
            </h2>
        </Link>
    )
}

export default PostCard