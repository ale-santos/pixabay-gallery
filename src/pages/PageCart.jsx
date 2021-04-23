import React from 'react'

export const PageCart = () => {
    return (
        <div className="max-w-7xl mx-auto pt-24 pb-8 lg:pt-0 px-6 lg:px-8">
            <h1 className="w-full text-center text-2xl">My Favorites</h1>
            <div className="w-full mt-8 px-32 mx-auto">
            <table className="table-auto w-full px-4">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Intro to CSS</td>
                        <td>Adam</td>
                        <td>858</td>
                    </tr>
                    <tr class="bg-blue-200">
                        <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
                        <td>Adam</td>
                        <td>112</td>
                    </tr>
                    <tr>
                        <td>Intro to JavaScript</td>
                        <td>Chris</td>
                        <td>1,280</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>

    )
}
