import LayoutComman from "../components/LayoutComman";
import TeamMemberVerifiedForm from "../components/TeamMemberVerifiedForm";

const TeamMemberInvitations = () => {
    console.log ( `react snippet works!` );

    return (
        <>
            <LayoutComman title={''} form={<TeamMemberVerifiedForm />} />
        </>
    );
}

export default TeamMemberInvitations;