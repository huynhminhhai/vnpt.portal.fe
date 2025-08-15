interface ServiceHeadingProps {
  title: string
}

const ServiceHeading: React.FC<ServiceHeadingProps> = ({ title }) => {

  return (
    <div className="mb-5 mt-10 text-[20px] leading-[1.2] font-medium border-l-[4px] border-primary pl-3 uppercase">
      {title}
    </div>
  )
}

export default ServiceHeading
