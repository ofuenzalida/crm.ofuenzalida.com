<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Property
 * 
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $latitude
 * @property string $longitude
 * @property string|null $polygon
 * @property int $users_id
 * @property int $offices_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property bool $has_lawn
 * @property bool $has_sprinklers
 * @property bool $has_apartments
 * 
 * @property Office $office
 * @property User $user
 * @property Collection|Lawn[] $lawns
 * @property Collection|Repair[] $repairs
 * @property Collection|RepairsItem[] $repairs_items
 * @property Collection|RepairsItemsFile[] $repairs_items_files
 * @property Collection|Task[] $tasks
 *
 * @package App\Models
 */
class Property extends Model
{
	use SoftDeletes;
	protected $table = 'properties';

	protected $casts = [
		'users_id' => 'int',
		'offices_id' => 'int',
		'has_lawn' => 'bool',
		'has_sprinklers' => 'bool',
		'has_apartments' => 'bool'
	];

	protected $fillable = [
		'name',
		'address',
		'latitude',
		'longitude',
		'polygon',
		'users_id',
		'offices_id',
		'has_lawn',
		'has_sprinklers',
		'has_apartments'
	];

	public function office()
	{
		return $this->belongsTo(Office::class, 'offices_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'users_id');
	}

	public function lawns()
	{
		return $this->hasMany(Lawn::class, 'properties_id');
	}

	public function repairs()
	{
		return $this->hasMany(Repair::class, 'properties_id');
	}

	public function repairs_items()
	{
		return $this->hasMany(RepairsItem::class, 'properties_id');
	}

	public function repairs_items_files()
	{
		return $this->hasMany(RepairsItemsFile::class, 'properties_id');
	}

	public function tasks()
	{
		return $this->hasMany(Task::class, 'properties_id');
	}
}
