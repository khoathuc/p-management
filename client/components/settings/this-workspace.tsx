import SaveResetButton from "./_components/save-reset-button";
import TabContainer from "./_components/tab-container";
import WorkspaceAccess from "./_components/this-workspace-access";
import WorkspaceDetails from "./_components/this-workspace-details";


const ThisWorkspace = () => {

    return (
        <>
            <SaveResetButton />
            <TabContainer>
                <WorkspaceDetails />
                <WorkspaceAccess />
            </TabContainer>
        </>
    );
}

export default ThisWorkspace;