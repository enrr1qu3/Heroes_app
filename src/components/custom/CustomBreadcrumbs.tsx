import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { Link } from 'react-router';

interface Breadcrumb {
    label: string;
    to: string;
}

interface Props {
    currenPage: string;
    breadcrumbs?: Breadcrumb[];
}

export const CustomBreadcrumbs = ({ currenPage, breadcrumbs = [] }: Props) => {
    return (
        <Breadcrumb className='my-5'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to='/'>Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>

                {breadcrumbs.map((crumb) => (
                    <div className='flex items-center'>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={crumb.to}>{crumb.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>

                    </div>
                ))}

                <BreadcrumbItem>
                    <BreadcrumbLink className='text-black'>{currenPage}</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
};