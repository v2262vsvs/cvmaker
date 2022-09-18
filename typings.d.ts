type Personal = {
    name?: string;
    syrname?: string;
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
    startDate: Date;
    endDate: Date;
  };
  type Experience = {
    degree: string;
    city: string;
    employer: string;
    description: string;
    startDate: Date;
    endDate: Date;
  };
  type Skills = {
    habit: string;
    level: string;
  };
  type Languages = {
    language: string;
    level: string;
  };