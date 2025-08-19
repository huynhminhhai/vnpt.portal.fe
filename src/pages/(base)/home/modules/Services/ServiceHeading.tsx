interface ServiceHeadingProps {
  title: string
}

const ServiceHeading: React.FC<ServiceHeadingProps> = ({ title }) => {

  return (
    <div className="mb-5 mt-8 text-[18px] leading-[1.2] font-bold border-l-[4px] border-primary pl-3 uppercase">
      {title}
    </div>
  )
}

export default ServiceHeading
