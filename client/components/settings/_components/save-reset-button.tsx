import { Button } from "../../ui/button";

const SaveResetButton = () => {

    return (
        <div className="flex justify-end">
            <Button variant="outline" className="w-16 inline-block">Reset </Button >
            <Button variant='outline' className="bg-green-600 w-16 inline-block mx-3 text-white hover:text-white hover:bg-green-900">Save </Button >

        </div>

    );
};

export default SaveResetButton;