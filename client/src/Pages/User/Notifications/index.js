import { memo } from 'react';

const UserNotifications = memo(() => {
    const notifications = [
        {
            id: 1,
            name: "Samuel Abera",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore reiciendis earum quasi",
            time: "a few moments ago",
            image: "https://lh3.googleusercontent.com/a/ACg8ocIexhmmTS8LcwWo1fPGY5Fl3KXpd-JuBE_Gj56P3rUR2g=s96-c",
            outline: "outline-blue-400",
        },
        {
            id: 2,
            name: "Sammy Tg",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore reiciendis earum quasi",
            time: "7 minutes ago",
            image: "https://images.unsplash.com/photo-1463453091185-61582044d556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8cGVvcGxlfGVufDB8MHx8fDE3MTExMTEzODd8MA&ixlib=rb-4.0.3&q=80&w=1080",
            outline: "outline-blue-400",
        },
        {
            id: 3,
            name: "Sammy Ab",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore reiciendis earum quasi",
            time: "2 days ago",
            image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080",
            outline: "outline-blue-400",
        },
    ];

    return (
        <div className="w-full h-full py-10 flex flex-col gap-4 items-center justify-center  ">
            <div className="md:text-4xl sm:text-3xl text-2xl text-center font-serif font-extrabold border-b-2  rounded-b-md mb-6 border-yellow-500 text-black ">
                Notifications
            </div>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="sm:w-[70%] w-[94%] mx-auto  bg-gray-700 p-4 rounded-md flex sm:gap-4 gap-2 items-center justify-center"
                >
                    <img
                        src={notification.image}
                        alt="profile"
                        className={`w-[5rem] object-cover h-[5rem] outline outline-2 ${notification.outline} rounded-full`}
                    />
                    <div className="w-[80%] flex flex-col gap-1">
                        <div className="text-lg font-semibold font-serif text-white ">
                            {notification.name}
                        </div>
                        <p className="text-sm  text-gray-300">
                            {notification.message}
                        </p>
                        <p className="text-[12px] text-semibold  text-gray-400 text-right">
                            {notification.time}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default UserNotifications;
