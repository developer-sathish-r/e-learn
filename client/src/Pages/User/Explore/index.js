import React, { memo } from "react";

const ComponentCard = memo(({ icon, title, description, link }) => (
    <div className="space-y-3">
        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full ">
            {icon}
        </span>
        <h1 className="text-xl font-semibold text-gray-700 capitalize ">
            {title}
        </h1>
        <p className="text-gray-500 ">{description}</p>
        <a
            href={link}
            className="inline-flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform  hover:underline hover:text-blue-600 "
        >
            <span className="mx-1">read more</span>
            <svg
                className="w-4 h-4 mx-1 rtl:-scale-x-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </a>
    </div>
));

const Explore = () => {
    const components = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                </svg>
            ),
            title: "Copy & paste components",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
            link: "#",
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                </svg>
            ),
            title: "Zero Configuration",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
            link: "#",
        },
        // Add more components here
    ];

    return (
        <section className="bg-white">
            <div className="">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl ">
                    explore our <br /> awesome <span className="underline decoration-blue-500">Components</span>
                </h1>
                <p className="mt-4 text-gray-500 xl:mt-6 ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
                </p>
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
                    {components.map((component, index) => (
                        <ComponentCard
                            key={index}
                            icon={component.icon}
                            title={component.title}
                            description={component.description}
                            link={component.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Explore;
