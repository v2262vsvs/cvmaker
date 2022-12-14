type Personal = {
    name?: string;
    surname?: string;
    image?: string | undefined;
    phone?: string;
    postalcode?: string;
    address?: string;
    city?: string;
    email?: string;
};

type Education = {
    degree: string;
    city: string;
    school: string;
    description: string;
    startdate: Date;
    enddate: Date;
};
type Experience = {
    position: string;
    city: string;
    employer: string;
    description: string;
    startdate: Date;
    enddate: Date;
};
type Skills = {
    habit: string;
    level: string;
};
type Languages = {
    language: string;
    level: string;
};
